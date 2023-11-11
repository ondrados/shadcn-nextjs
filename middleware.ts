// middleware.js
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD } = process.env;

    const authHeader = request.headers.get('authorization') || '';
    const [type, encoded] = authHeader.split(' ');

    if (type === 'Basic' && encoded) {
        const decoded = Buffer.from(encoded, 'base64').toString();
        const [username, password] = decoded.split(':');

        if (username === BASIC_AUTH_USERNAME && password === BASIC_AUTH_PASSWORD) {
            return NextResponse.next();
        }
    }

    return new NextResponse('Authentication required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    });
}

// Apply the middleware to every route
export const config = {
    matcher: '/',
};
