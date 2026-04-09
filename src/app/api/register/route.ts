import { registerSchema } from "@/lib/validations";
import { RegistrantService } from "@/lib/services/registrant.service";
import { ApiResponse } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return ApiResponse.error(
        "Input tidak valid", 
        400, 
        result.error.flatten().fieldErrors
      );
    }

    const data = await RegistrantService.registerParticipant(result.data);

    return ApiResponse.success(
      data, 
      "Pendaftaran berhasil!", 
      201
    );
  } catch (error: any) {
    console.error("Error during registration:", error);
    
    // Check if it's a known business logic error (like duplicate email)
    const status = error.message.includes("sudah terdaftar") ? 409 : 500;
    
    return ApiResponse.error(
      error.message || "Terjadi kesalahan server internal.",
      status
    );
  }
}
