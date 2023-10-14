import { connectDB } from "@/libs/mongodb";
import  Invoice  from "@/models/invoice";
import { NextResponse } from "next/server";

export async function GET(request: Request){

  const url = new URL(request.url);
  const user_id = url.searchParams.get('user_id');

    try {
      await connectDB();
  
      const invoices = await Invoice.find({ user: user_id})
      
      return NextResponse.json({ invoices })
  
    } catch (error) {
      if(error instanceof Error){
        console.log(error);
        return NextResponse.json({message: error.message}, {status: 500})
      }
    }
  
}

export async function POST(request: Request){
    const { user_id, amount, date, service, consumption } = await request.json();
  
    try {
      
    await connectDB();
    const invoice = new Invoice({
      user: user_id,
      amount,
      date,
      service,
      consumption
    })

    const savedInvoice = await invoice.save();
    console.log(savedInvoice)
  
    return NextResponse.json({ savedInvoice })
  
    } catch (error) {
      if(error instanceof Error){
        console.log(error);
        return NextResponse.json({message: error.message}, {status: 500})
      }
    }
}

export async function DELETE(request: Request){
  const url = new URL(request.url);
  const invoice_id = url.searchParams.get('invoice_id');

  try {
    await connectDB();

    const deletedInvoice = await Invoice.findByIdAndDelete(invoice_id);

    if (deletedInvoice) {
      return NextResponse.json({ message: 'Invoice deleted successfully', deletedInvoice });
    } else {
      return NextResponse.json({ message: 'Invoice not found', status: 404 });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}