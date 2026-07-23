import { registerSchema } from "@/validators/registerSchema";

describe("registerSchema", () => {
  it("accepte des données valides", () => {
    const result = registerSchema.safeParse({
      name: "Ayoub Hanine",
      email: "ayoub@test.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(result.success).toBe(true);
  });

  it("refuse un email invalide", () => {
    const result = registerSchema.safeParse({
      name: "Ayoub",
      email: "email-invalide",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(result.success).toBe(false);
  });

  it("refuse un mot de passe trop court", () => {
    const result = registerSchema.safeParse({
      name: "Ayoub",
      email: "ayoub@test.com",
      password: "123456",
      confirmPassword: "123456",
    });

    expect(result.success).toBe(false);
  });

  it("refuse lorsque les mots de passe sont différents", () => {
    const result = registerSchema.safeParse({
      name: "Ayoub",
      email: "ayoub@test.com",
      password: "password123",
      confirmPassword: "password456",
    });

    expect(result.success).toBe(false);
  });
});