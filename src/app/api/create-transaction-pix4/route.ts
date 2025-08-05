import { NextRequest, NextResponse } from 'next/server';

import TransactionPixProtocol4 from '@/interfaces/transactionPixProtocol4';

interface BodyProps extends TransactionPixProtocol4 {} // eslint-disable-line

export async function POST(req: NextRequest) {
  try {
    let { amount, paymentMethod, customer, items, pix } =
      (await req.json()) as BodyProps;
    amount = +amount;
    items = items.map(item => ({ ...item, unitPrice: +item.unitPrice, quantity: +item.quantity })); // eslint-disable-line

    const newBody: TransactionPixProtocol4 = {
      amount,
      paymentMethod,
      customer,
      items,
      pix,
    };

    const resTransaction = await fetch(
      'https://api.velana.com.br/v1/transactions',
      {
        method: 'post',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization:
            'Basic ' +
            Buffer.from(`${process.env.VELANA_PAYMENT_SECRET}:x`).toString(
              'base64'
            ),
        },
        body: JSON.stringify(newBody),
      }
    );
    const dataTransaction = await resTransaction.json();
    // console.log(dataTransaction);
    const qrcode = dataTransaction.pix.qrcode;

    return NextResponse.json({
      success: true,
      qrcode,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        errorMsg: 'Erro ao gerar pagamento, por favor tente novamente',
      },
      {
        status: 400,
      }
    );
  }
}
