const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // validate using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "Something went wrongllll",
    //     error: error.details,
    //   });
    // }

    // validation using zod
    const value = studentValidationSchema.parse(studentData);
    const result = await StudentServices.createStudentIntoDB(value);

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const UserController = {
  createStudent,
};
