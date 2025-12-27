export class ResponseHelper {
  static success(data: any) {
    return {
      success: true,
      data,
      error: null,
    };
  }

  static error(error: any) {
    return {
      success: false,
      data: null,
      error: error?.message || 'Internal server error',
    };
  }
}
