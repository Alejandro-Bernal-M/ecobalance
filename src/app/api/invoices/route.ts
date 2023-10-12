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
    console.log('post')
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

