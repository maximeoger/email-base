import { google, Auth } from "googleapis";
import readline from 'readline';
import fs from "node:fs/promises";
import path, { resolve } from "node:path";
import { rejects } from "node:assert";
import { createServer } from "node:http";

type OAuthCredentails = {
  web: Record<string, string | string[]>;
  installed?: OAuthCredentails['web'];
}

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');

export async function readCredentials() {
  try {
    let credentials;

    const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

    const credentialsFileHandle = await fs.open(CREDENTIALS_PATH, 'r')

    credentials = await credentialsFileHandle.readFile("utf-8")
    
    credentialsFileHandle.close()

    return JSON.parse(credentials)

  } catch(err) {
    console.error(err)
  }
}

export default class OAuthClient {
  client: Auth.OAuth2Client

  constructor (credentials: OAuthCredentails) {
    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
    
    this.client = new google.auth.OAuth2(
      client_id as string, 
      client_secret as string, 
      redirect_uris[0]
    )
  }

  public async authorize () {

    try {
      const tokenFileHandle = await fs.open(TOKEN_PATH, 'r')
      const token = await tokenFileHandle.readFile("utf-8")
      await tokenFileHandle.close()

      this.client.setCredentials(JSON.parse(token))

    } catch(err) {
      await this.getNewToken();
    }
  }

  private async getNewToken (): Promise<void> {

    return new Promise((resolve, reject) => {

      const server = createServer(async (req, res) => {
        if(!req.url) return;

        if (req.url.startsWith("/oauth2callback")) {
          const urlObj = new URL(req.url, "http://localhost:3003");
          const code = urlObj.searchParams.get("code")

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<h1>Authentification réussie ! Vous pouvez fermer cet onglet.</h1>');

          console.log('urlObj', urlObj)

          server.close();

          if (!code) {
            return reject(new Error('Impossible de récupérer le "code" OAuth.'));
          }

          this.client.getToken(code, async (err, token) => {
            if (err) {
              return reject("Erreur lors de la récupération du token. " + err)
            }

            if (!token) {
              return reject('Aucun token renvoyé.');
            }
  
            try {
              await fs.writeFile(TOKEN_PATH, JSON.stringify(token));
              console.log('Token stocké dans', TOKEN_PATH);
              resolve();

            } catch(writeErr) {
              reject('Erreur lors de l\'écriture du token: ' + writeErr);
            }
          })
        }

        
      })

      server.listen(3003, () => {
        const authUrl = this.client.generateAuthUrl({ 
          access_types: 'offline', 
          scope: SCOPES,
          redirect_uri: 'http://localhost:3003/oauth2callback'
        });
        console.log('Veuillez autoriser cette application en visitant ce lien : ');
        console.log(authUrl);
      })

    })
    
  }

}  