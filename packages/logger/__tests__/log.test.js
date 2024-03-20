import { log } from "..";
jest.spyOn(global.console, "log");
describe("@repo/logger", function () {
    it("prints a message", function () {
        log("hello");
        // eslint-disable-next-line no-console -- testing console
        expect(console.log).toBeCalledWith("LOGGER: ", "hello");
    });
});
