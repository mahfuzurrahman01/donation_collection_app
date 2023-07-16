import Cookies from 'js-cookie'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // const token = localStorage.getItem("token")
  const url = request.url;
  const verify = request.cookies.get('isLoggedIn');
  if(!verify && url.includes("/causes")){
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  if(!verify && url.includes("/dashboard")){
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}
 
