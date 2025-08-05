export const maxDuration = 300;

import { NextRequest, NextResponse } from 'next/server';

import ScrapeError from '@/errors/scrapeError';

export async function GET(req: NextRequest) {
  try {
    const transactionId = req.nextUrl.searchParams.get('transactionId');

    const resTransaction = await fetch(
      `https://api.fastsoftbrasil.com/api/user/transactions/${transactionId}`,
      {
        method: 'get',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization:
            'Basic ' +
            Buffer.from(`x:${process.env.MAX_GATEWAY_PAYMENT_SECRET}`).toString(
              'base64'
            ),
        },
      }
    );
    const dataTransaction = await resTransaction.json();
    const status = dataTransaction.data.status;

    return NextResponse.json({
      success: true,
      status,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof ScrapeError) {
      return NextResponse.json(
        {
          success: false,
          error: { message: err.message },
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Erro ao fazer a consulta, por favor tente novamente.',
        },
      },
      { status: 400 }
    );
  } finally {
    // await browser.close();
  }
}
