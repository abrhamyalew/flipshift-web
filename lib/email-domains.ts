/**
 * Known, legitimate consumer and professional email providers.
 * Used to block disposable/fake domains on the waitlist.
 */
export const ALLOWED_EMAIL_DOMAINS = new Set([
  // Google
  "gmail.com",
  "googlemail.com",

  // Microsoft
  "outlook.com",
  "outlook.co.uk",
  "outlook.fr",
  "outlook.de",
  "outlook.com.au",
  "hotmail.com",
  "hotmail.co.uk",
  "hotmail.fr",
  "hotmail.de",
  "hotmail.it",
  "hotmail.es",
  "live.com",
  "live.co.uk",
  "live.fr",
  "live.com.au",
  "live.ca",
  "msn.com",

  // Apple
  "icloud.com",
  "me.com",
  "mac.com",

  // Yahoo
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.fr",
  "yahoo.de",
  "yahoo.es",
  "yahoo.it",
  "yahoo.ca",
  "yahoo.com.au",
  "yahoo.co.in",
  "yahoo.com.br",
  "yahoo.co.jp",

  // ProtonMail
  "protonmail.com",
  "protonmail.ch",
  "proton.me",
  "pm.me",

  // Fastmail
  "fastmail.com",
  "fastmail.fm",
  "fastmail.org",

  // Hey / Basecamp
  "hey.com",

  // AOL
  "aol.com",
  "aol.co.uk",

  // Mail.com / GMX
  "mail.com",
  "gmx.com",
  "gmx.de",
  "gmx.net",
  "gmx.at",
  "gmx.co.uk",

  // Web.de / T-Online (Germany)
  "web.de",
  "t-online.de",
  "freenet.de",

  // Yandex (Russia)
  "yandex.com",
  "yandex.ru",
  "yandex.ua",
  "ya.ru",

  // Zoho
  "zoho.com",

  // Tutanota
  "tutanota.com",
  "tutanota.de",
  "tuta.io",

  // Mailfence
  "mailfence.com",

  // US ISPs
  "comcast.net",
  "xfinity.com",
  "verizon.net",
  "att.net",
  "sbcglobal.net",
  "cox.net",
  "charter.net",
  "earthlink.net",
  "bellsouth.net",
  "optonline.net",

  // UK / EU
  "btinternet.com",
  "virginmedia.com",
  "sky.com",
  "talktalk.net",
  "ntlworld.com",
  "orange.fr",
  "sfr.fr",
  "free.fr",
  "laposte.net",
  "wanadoo.fr",
  "libero.it",
  "tin.it",
  "alice.it",
  "tiscali.it",
  "telenet.be",
  "xs4all.nl",
  "hetnet.nl",
  "ziggo.nl",

  // Africa / MENA
  "ethionet.et",
]);

export function isAllowedEmailDomain(email: string): boolean {
  const parts = email.toLowerCase().trim().split("@");
  if (parts.length !== 2) return false;
  return ALLOWED_EMAIL_DOMAINS.has(parts[1]);
}
