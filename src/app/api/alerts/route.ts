import { connectDB } from "@/libs/mongodb";
import Alert from "@/models/alert";
import { NextResponse } from "next/server";

export async function GET(request: Request){
  const url = new URL(request.url);
  const user_id = url.searchParams.get('user_id');

  try {
    await connectDB();

    const alerts = await Alert.find({user: user_id})

    return NextResponse.json({alerts});
  } catch (error) {
    if(error instanceof Error){
      console.log(error);
      return NextResponse.json({error: error.message}, {status: 500})
    }
  }
};

export async function POST(request: Request){
  const { amount, service, user_id } = await request.json()

  try {
    await connectDB();
    const alert = new Alert({
      amount,
      service,
      user: user_id
    })
    const savedAlert = await alert.save();

    return NextResponse.json({savedAlert})
  } catch (error) {
    if(error instanceof Error){
      console.log(error);
      return NextResponse.json({message: error.message}, {status: 500})
    }
  }
}

export async function DELETE(request: Request){
  const url = new URL(request.url);
  const alert_id = url.searchParams.get('alert_id');

  try {
    await connectDB();
    const deletedAlert = await Alert.findByIdAndDelete(alert_id);

    if(deletedAlert){
      return NextResponse.json({message: "alert deleted", deletedAlert});
    }else {
      return NextResponse.json({message: "alert not found"}, {status: 404});
    }
  } catch (error) {
    if(error instanceof Error){
      console.log(error);
      return NextResponse.json({message: error.message}, {status: 500})
    }
  }
}