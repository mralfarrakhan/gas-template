declare const __APP_VERSION__: string;

declare namespace google {
  namespace script {
    interface Runner {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      withSuccessHandler<T = any>(callback: (response: T) => void): Runner;
      withFailureHandler(callback: (error: Error) => void): Runner;
      withUserObject(object: unknown): Runner;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    }

    const run: Runner;

    namespace host {
      function close(): void;
      function setHeight(height: number): void;
      function setWidth(width: number): void;
      namespace editor {
        function focus(): void;
      }
    }

    namespace url {
      function getLocation(
        callback: (location: {
          hash: string;
          parameter: Record<string, string>;
          parameters: Record<string, string[]>;
        }) => void,
      ): void;
    }
  }
}
