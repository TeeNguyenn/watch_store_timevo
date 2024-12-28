export const verify = () => {
    const inputs: any = document.querySelectorAll(".field > input");
    const button: any = document.querySelector(".verify-btn");

    window.addEventListener("load", () => inputs[0].focus());
    button?.setAttribute("disabled", "disabled");

    // inputs[0].addEventListener("paste", function (event: any) {
    //     event.preventDefault();

    //     const pastedValue = (event.clipboardData || window.Clipboard).getData(
    //         "text"
    //     );
    //     const otpLength = inputs.length;

    //     for (let i = 0; i < otpLength; i++) {
    //         if (i < pastedValue.length) {
    //             inputs[i].value = pastedValue[i];
    //             inputs[i].removeAttribute("disabled");
    //             inputs[i].focus();
    //         } else {
    //             inputs[i].value = ""; // Clear any remaining inputs
    //             inputs[i].focus();
    //         }
    //     }
    // });

    inputs.forEach((input: any, index1: any) => {
        input.addEventListener("keyup", (e: any) => {
            const currentInput = input;
            const nextInput = input.nextElementSibling;
            const prevInput = input.previousElementSibling;

            if (currentInput.value.length > 1) {
                currentInput.value = "";
                return;
            }

            if (
                nextInput &&
                nextInput.hasAttribute("disabled") &&
                currentInput.value !== ""
            ) {
                nextInput.removeAttribute("disabled");
                nextInput.focus();
            }

            if (e.key === "Backspace") {
                inputs.forEach((input: any, index2: any) => {
                    if (index1 <= index2 && prevInput) {
                        input.setAttribute("disabled", true);
                        input.value = "";
                        prevInput.focus();
                    }
                });
            }

            button.classList.remove("active");
            button.setAttribute("disabled", "disabled");

            const inputsNo = inputs.length;
            if (!inputs[inputsNo - 1].disabled && inputs[inputsNo - 1].value !== "") {
                button.classList.add("active");
                button.removeAttribute("disabled");

                return;
            }
        });
    });
}