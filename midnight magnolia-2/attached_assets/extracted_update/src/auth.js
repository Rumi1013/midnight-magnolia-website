import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import cookie from 'cookie';
import sig from 'cookie-signature';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const COOKIE_NAME = 'mm_session';
const SIGN_KEY = process.env.SESSION_SECRET;

export async function sendMagicLink(email) {
  return await supabase.auth.signInWithOtp({ email });
}

export function setSessionCookie(res, session) {
  const raw = JSON.stringify(session); // contains access_token, etc.
  const signed = 's:' + sig.sign(raw, SIGN_KEY);
  res.setHeader('Set-Cookie', cookie.serialize(COOKIE_NAME, signed, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: true,
    maxAge: 60 * 60 * 24 * 7
  }));
}

export function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', cookie.serialize(COOKIE_NAME, '', {
    httpOnly: true, sameSite: 'lax', path: '/', secure: true, maxAge: 0
  }));
}

export function getSessionFromCookie(req) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const val = cookies[COOKIE_NAME];
  if (!val || !val.startsWith('s:')) return null;
  const raw = sig.unsign(val.slice(2), SIGN_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export async function requireUser(req, res, next) {
  const sess = getSessionFromCookie(req);
  if (!sess?.access_token) return res.redirect('/login');
  const { data, error } = await supabase.auth.getUser(sess.access_token);
  if (error || !data?.user) return res.redirect('/login');
  req.user = data.user;
  next();
}

export function requireAdmin(req, res, next) {
  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(s => s.trim()).filter(Boolean);
  if (req.user && adminEmails.includes(req.user.email)) return next();
  return res.status(403).send('Forbidden');
}