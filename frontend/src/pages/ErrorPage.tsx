import { FC } from "react";

interface ErrorPropsI {
  statusCode: string;
  message: string;
}

const ErrorPage: FC<ErrorPropsI> = ({ statusCode, message }) => {
  return (
    <div className="text-slate-600 text-center mt-36">
      <div className="space-y-3">
        <div>
          <div>
            <h1 className="text-8xl font-semibold">{statusCode}</h1>
          </div>
        </div>
        <div className="text-2xl">{message}</div>
      </div>
    </div>
  );
};

export default ErrorPage;
