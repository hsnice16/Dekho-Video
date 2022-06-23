import { ROUTE_SIGN_UP } from "utils";
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

export const SignIn = () => {
  useScrollToTop();
  useDocumentTitle(
    "Log In to access Your Playlists, Watch Later and Liked videos"
  );

  const {
    status,
    error,
    email,
    password,
    rememberMe,
    handleInputChange,
    handleSignInFormSubmit,
    handleGuestLogInClick,
  } = useAuthHandler();

  return (
    <div className="pt-5">
      {status === "error" && (
        <FormError error={error} linkTo={ROUTE_SIGN_UP} onPage="SignIn" />
      )}

      <FormContainer
        className="max-w-45 w-33"
        handleSubmit={handleSignInFormSubmit}
      >
        <FormHeading headingText="Log In" />

        <FormLabel labelText="Email Address" labelFor="email-id" />
        <FormInput
          type="email"
          name="email"
          id="email-id"
          placeholder="dekho.video@example.com"
          value={email}
          handleChange={handleInputChange}
        />

        <FormLabel labelText="Password" labelFor="password" />
        <FormPasswordInput
          name="password"
          id="password"
          value={password}
          handleChange={handleInputChange}
        />

        <div className="align-i-ctr flex justify-c-sb mb-1 mt-2">
          <label className="cursor-ptr fs-1p5" htmlFor="remember-me">
            <input
              className="cursor-ptr"
              type="checkbox"
              name="rememberMe"
              id="remember-me"
              checked={rememberMe}
              onChange={handleInputChange}
            />{" "}
            Remember me
          </label>

          {/* future feature */}

          {/* <Link className="fs-1p5 fw-bold" to="#">
            Forgot Password?
          </Link> */}
        </div>

        <FormButton buttonText="Log In" status={status} />
        <FormButton
          buttonText="Log In as a Guest"
          status={status}
          onClick={handleGuestLogInClick}
        />
        <FormLink
          linkTo={ROUTE_SIGN_UP}
          linkText="New on Dekho Video? Sign Up"
        />
      </FormContainer>
    </div>
  );
};
