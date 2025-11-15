import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  try {
    const apiUrl = new URL('http://localhost:8080/apps');

    if (searchParams.get('limit'))
      apiUrl.searchParams.append('limit', searchParams.get('limit')!);
    if (searchParams.get('sort'))
      apiUrl.searchParams.append('sort', searchParams.get('sort')!);
    if (searchParams.get('category'))
      apiUrl.searchParams.append('category', searchParams.get('category')!);

    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch apps' },
      { status: 500 }
    );
  }
}
