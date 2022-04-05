import { ROUTE_SIGN_IN } from "utils";
import { useAuthHandler, useDocumentTitle, useScrollToTop } from "custom-hooks";
import {
  FormButton,
  FormContainer,
  FormError,
  FormHeading,
  FormInput,
  FormLabel,
  FormLink,
  FormPasswordInput,
} from "components";

export const SignUp = () => {
  useScrollToTop();
  useDocumentTitle("New on Dekho Video? Sign Up");

  const {
    status,
    error,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    handleInputChange,
    handleSignUpFormSubmit,
  } = useAuthHandler();

  return (
    <div className="mx-2 pt-5">
      {status === "error" && (
        <FormError error={error} linkTo={ROUTE_SIGN_IN} onPage="SignUp" />
      )}

      <FormContainer className="max-w-45" handleSubmit={handleSignUpFormSubmit}>
        <FormHeading headingText="Sign Up" />

        <div className="flex">
          <div className="mr-0p5">
            <FormLabel labelFor="first-name" labelText="First Name" />
            <FormInput
              type="text"
              name="firstName"
              id="first-name"
              placeholder="Dekho"
              value={firstName}
              handleChange={handleInputChange}
            />
          </div>

          <div className="ml-0p5">
            <FormLabel labelFor="last-name" labelText="Last Name" />
            <FormInput
              type="text"
              name="lastName"
              id="last-name"
              placeholder="Video"
              value={lastName}
              handleChange={handleInputChange}
            />
          </div>
        </div>

        <FormLabel labelFor="email-id" labelText="Email Address" />
        <FormInput
          type="email"
          name="email"
          id="email-id"
          placeholder="dekho.video@example.com"
          value={email}
          handleChange={handleInputChange}
        />

        <FormLabel labelFor="password" labelText="Password" />
        <FormPasswordInput
          name="password"
          id="password"
          value={password}
          handleChange={handleInputChange}
        />
        <span className="block fs-1p2 mb-1">
          Should be Alpha Numeric and should have minimum length 6.
        </span>

        <FormLabel labelFor="confirm-password" labelText="Confirm Password" />
        <FormPasswordInput
          name="confirmPassword"
          id="confirm-password"
          value={confirmPassword}
          handleChange={handleInputChange}
        />

        <span className="block fs-1p2 mb-1 mt-2">
          By continuing, you agree to Dekho Videos' Terms of Use and Privacy
          Policy.
        </span>

        <FormButton buttonText="Create New Account" status={status} />
        <FormLink
          linkTo={ROUTE_SIGN_IN}
          linkText="Already using Dekho Video? Log In"
        />
      </FormContainer>
    </div>
  );
};
