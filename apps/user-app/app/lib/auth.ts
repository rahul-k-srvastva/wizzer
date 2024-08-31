import Credentials from "next-auth/providers/credentials";
import { db } from "@repo/db";
import bcrypt from "bcrypt";
import { AuthOptions, Session } from "next-auth";

export type SessionWithIdType = Session & { user : { id : string | undefined}};

export const AUTH_CONFIG : AuthOptions ={
    providers: [
      Credentials({
        name: "Mobile Number",
        credentials: {
          phone: {
            label: "Phone number",
            placeholder: "9999999999",
            type: "text",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          //zod validations
  
          try {
            const existingUser = await db.user.findUnique({
              where: {
                number: credentials?.phone,
              },
            });
  
            if (!existingUser) {
              const hashedPwd = await bcrypt.hash(credentials!.password, 10);
  
              const user = await db.user.create({
                data: {
                  number: credentials!.phone,
                  password: hashedPwd,
                },
              });
  
              return {
                id: user.id.toString(),
                name: user.name,
                email: user.number,
              };
            } else {
              const pwdValResult = await bcrypt.compare(
                credentials!.password,
                existingUser.password
              );
  
              if (pwdValResult) {
                return {
                  id: existingUser.id.toString(),
                  name: existingUser.name,
                  email: existingUser.email,
                };
              }
              return null;
            }
          } catch (error) {
            console.log(error);
            return null;
          }
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "",
    callbacks: {
      async jwt({ token }) {
        console.log("JWT Token created : " + JSON.stringify(token));
        return token;
      },
      async session({ session, token, user }){

        const sessionWithId : SessionWithIdType = {...session , user : {...session.user , id : undefined}}; 

        if (session && session.user) {
          sessionWithId.user.id = token.sub;
        }

        return sessionWithId;
      },  
    },
  }