
function scanMessage() {
    const input = document.getElementById("messageInput");
    const result = document.getElementById("result");

    const message = input.value.trim().toLowerCase();

    if (message === "") {
        result.className = "result medium";
        result.innerHTML = "⚠️ Please enter a message to analyze.";
        return;
    }

    // Common scam warning signs
    const rules = [
        {
            words: ["otp", "verification code"],
            reason: "Requests for OTP or verification codes"
        },
        {
            words: ["upi pin", "pin"],
            reason: "Requests for a PIN or confidential banking details"
        },
        {
            words: ["urgent", "immediately", "act now"],
            reason: "Creates urgency or pressure"
        },
        {
            words: ["account blocked", "account suspended", "account will be blocked"],
            reason: "Threatens account suspension"
        },
        {
            words: ["click here", "verify now", "unknown link"],
            reason: "Encourages clicking or verifying through a message"
        },
        {
            words: ["send money", "pay now", "transfer money"],
            reason: "Requests an immediate money transfer"
        },
        {
            words: ["prize", "winner", "lottery", "reward"],
            reason: "Unexpected prize or reward claim"
        }
    ];

    let score = 0;
    let warnings = [];

    rules.forEach(rule => {
        if (rule.words.some(word => message.includes(word))) {
            score += 20;
            warnings.push(rule.reason);
        }
    });

    score = Math.min(score, 100);

    let level;
    let cssClass;
    let advice;

    if (score >= 60) {
        level = "HIGH RISK";
        cssClass = "high";
        advice = "Do not act on this message. Avoid links and payment requests. Verify independently.";
    } else if (score >= 20) {
        level = "SUSPICIOUS";
        cssClass = "medium";
        advice = "Proceed cautiously. Verify the sender using an official contact method.";
    } else {
        level = "LOW WARNING SCORE";
        cssClass = "low";
        advice = "No listed warning signs were detected. This does not prove the message is genuine.";
    }

    result.className = "result " + cssClass;

    let warningHTML = warnings.length
        ? warnings.map(item => "<li>" + item + "</li>").join("")
        : "<li>No matching warning patterns were found.</li>";

    result.innerHTML = `
        <h3>Risk Assessment: ${level}</h3>
        <p><strong>Demo Risk Score:</strong> ${score}/100</p>
        <br>
        <h4>Warning Signs</h4>
        <ul>${warningHTML}</ul>
        <br>
        <p><strong>Safety Advice:</strong> ${advice}</p>
        <p style="margin-top:12px;font-size:12px">
            This is a rule-based prototype, not a real AI or banking security system.
        </p>
    `;
}
