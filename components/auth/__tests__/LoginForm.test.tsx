import { render, screen } from "@testing-library/react";
import LoginForm from "../LoginForm";

// Mock du router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

// Mock du service login
jest.mock("@/services/auth.service", () => ({
  login: jest.fn(),
}));

describe("LoginForm", () => {
  it("affiche tous les champs du formulaire", () => {
    render(<LoginForm />);

    expect(
      screen.getByPlaceholderText("Adresse email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Mot de passe")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /se connecter/i,
      })
    ).toBeInTheDocument();
  });
});