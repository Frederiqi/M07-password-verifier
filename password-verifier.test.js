const {
    verifyPassword,
    hasRightLength,
    isNotNull,
    hasUpperCaseCharacter,
    hasLowerCaseCharacter,
    hasDigit,
    minimumConditionsReached,
} = require("./password-verifier");

describe("Password verifier utility functions", () => {
    test("hasRightLength", () => {
        expect(hasRightLength("123456789")).toBe(false);
    });

    test("hasRightLength, happy path 1", () => {
        expect(hasRightLength("12345678")).toBe(true);
    });

    test("hasRightLength, happy path 2", () => {
        expect(hasRightLength("")).toBe(true);
    });

    test("hasRightLength, null", () => {
        expect(hasRightLength(null)).toBe(false);
    });

    test("isNotNull", () => {
        expect(isNotNull(null)).toBe(false);
    });

    test("isNotNull, happy path", () => {
        expect(isNotNull("a")).toBe(true);
    });

    test("hasUpperCaseCharacter", () => {
        expect(hasUpperCaseCharacter("a")).toBe(false);
    });

    test("hasUpperCaseCharacter, happy path 1", () => {
        expect(hasUpperCaseCharacter("A")).toBe(true);
    });

    test("hasUpperCaseCharacter, happy path 2", () => {
        expect(hasUpperCaseCharacter("Ab")).toBe(true);
    });

    test("hasUpperCaseCharacter, only digits", () => {
        expect(hasUpperCaseCharacter("12")).toBe(false);
    });

    test("hasUpperCaseCharacter, null", () => {
        expect(hasUpperCaseCharacter(null)).toBe(false);
    });

    test("hasLowerCaseCharacter", () => {
        expect(hasLowerCaseCharacter("Z")).toBe(false);
    });

    test("hasLowerCaseCharacter, happy path 1", () => {
        expect(hasLowerCaseCharacter("z")).toBe(true);
    });

    test("hasLowerCaseCharacter, happy path 2", () => {
        expect(hasLowerCaseCharacter("Zy")).toBe(true);
    });

    test("hasLowerCaseCharacter, only digits", () => {
        expect(hasLowerCaseCharacter("12")).toBe(false);
    });

    test("hasLowerCaseCharacter, null", () => {
        expect(hasLowerCaseCharacter(null)).toBe(false);
    });

    test("hasDigit", () => {
        expect(hasDigit("a")).toBe(false);
    });

    test("hasDigit, happy path 1", () => {
        expect(hasDigit("1")).toBe(true);
    });

    test("hasDigit, happy path 2", () => {
        expect(hasDigit("a1")).toBe(true);
    });

    test("hasDigit, null", () => {
        expect(hasDigit(null)).toBe(false);
    });
});

describe("Check combination of conditions", () => {
    test("minimumConditionsReached, all conditions false", () => {
        const conditions = [false, false, false, false, false];
        expect(minimumConditionsReached(conditions)).toBe(false);
    });

    test("minimumConditionsReached under cutoff", () => {
        const conditions = [true, true, false, false, false];
        expect(minimumConditionsReached(conditions)).toBe(false);
    });

    test("minimumConditionsReached on cutoff", () => {
        const conditions = [true, true, true, false, false];
        expect(minimumConditionsReached(conditions)).toBe(true);
    });

    test("minimumConditionsReached over cutoff", () => {
        const conditions = [true, true, true, true, false];
        expect(minimumConditionsReached(conditions)).toBe(true);
    });
});

describe("Verify password", () => {
    test("verifyPassword null", () => {
        expect(verifyPassword(null)).toBe(false);
    });

    test("verifyPassword ''", () => {
        expect(verifyPassword("")).toBe(false);
    });

    test("verifyPassword only digits", () => {
        expect(verifyPassword("1345")).toBe(false);
    });

    test("verifyPassword lowercase and digits, too long, but that ain't a problem", () => {
        expect(verifyPassword("henkie1234")).toBe(true);
    });

    test("verifyPassword uppercase and digits", () => {
        expect(verifyPassword("HENK33$")).toBe(false);
    });

    test("verifyPassword only uppercase", () => {
        expect(verifyPassword("ABC")).toBe(false);
    });

    test("verifyPassword only lowercase", () => {
        expect(verifyPassword("z")).toBe(true);
    });

    test("verifyPassword only lowercase, but too long", () => {
        expect(verifyPassword("advancedtesting")).toBe(false);
    });

    test("verifyPassword lowercase and uppercase, too long, but that ain't a problem because of the Uppercase", () => {
        expect(verifyPassword("PasswordTestingWithJestIsALotOfFun")).toBe(true);
    });

    test("verifyPassword, correct password", () => {
        expect(verifyPassword("henkie1")).toBe(true);
    });
});