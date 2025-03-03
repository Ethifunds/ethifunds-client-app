import Render from "@/components/render";
import * as React from "react";

type QrCodeProps = {
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  data: {
    qr_code_url: {
      headers: object;
      original: string;
      exception: null;
    };
    secret: string;
  }|undefined;
};

export default React.memo(function QrCode(props: QrCodeProps) {
  return (
    <Render
      isLoading={props.isFetching}
      isError={props.isError}
      error={props.error}
      loadType="simple"
      loadingPosition="center"
    >
      {props.data && (
        <div
          className="-mt-5"
          dangerouslySetInnerHTML={{
            __html: props.data?.qr_code_url.original,
          }}
        />
      )}
    </Render>
  );
});
