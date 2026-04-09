import { NextResponse } from "next/server";

export class ApiResponse {
  static success(data: any, message: string = "Success", status: number = 200) {
    return NextResponse.json(
      { success: true, message, data },
      { status }
    );
  }

  static error(message: string = "Error", status: number = 400, errors: any = null) {
    return NextResponse.json(
      { success: false, message, errors },
      { status }
    );
  }
}
