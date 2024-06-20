import React from "react";

const TermsOfService = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Terms of Service for Housing Support Stack
            </h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Introduction</h2>
                <p className="mb-2">
                    Welcome to Housing Support Stack! These Terms of Service
                    ("Terms") govern your use of our website and services. By
                    accessing or using Housing Support Stack, you agree to
                    comply with and be bound by these Terms.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">User Accounts</h2>
                <ul className="list-disc ml-6 mb-2">
                    <li>
                        <strong>Registration:</strong> To use certain features
                        of our service, you must create an account and provide
                        accurate information.
                    </li>
                    <li>
                        <strong>Account Security:</strong> You are responsible
                        for maintaining the confidentiality of your account
                        information and for all activities that occur under your
                        account.
                    </li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Use of Service</h2>
                <ul className="list-disc ml-6 mb-2">
                    <li>
                        <strong>Permitted Use:</strong> You may use our services
                        for lawful purposes only and in accordance with these
                        Terms.
                    </li>
                    <li>
                        <strong>Prohibited Use:</strong> You agree not to use
                        our services for any illegal or unauthorized purpose,
                        including but not limited to violating any local, state,
                        national, or international law.
                    </li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                    Messaging Services
                </h2>
                <ul className="list-disc ml-6 mb-2">
                    <li>
                        <strong>Compliance:</strong> All messaging services
                        provided through Housing Support Stack must comply with
                        10DLC regulations. This includes registering your
                        campaigns and ensuring that all messages are lawful and
                        consented to by the recipients.
                    </li>
                    <li>
                        <strong>Consent:</strong> You must obtain explicit
                        consent from recipients before sending any messages.
                    </li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Content</h2>
                <ul className="list-disc ml-6 mb-2">
                    <li>
                        <strong>Your Content:</strong> You retain ownership of
                        the content you upload or share through our services.
                        However, you grant us a license to use, display, and
                        distribute such content as necessary to provide our
                        services.
                    </li>
                    <li>
                        <strong>Prohibited Content:</strong> You agree not to
                        upload or share any content that is illegal, harmful, or
                        violates the rights of others.
                    </li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Termination</h2>
                <p className="mb-2">
                    We may terminate or suspend your account and access to our
                    services at our sole discretion, without prior notice, for
                    conduct that we believe violates these Terms or is harmful
                    to other users of Housing Support Stack, us, or third
                    parties, or for any other reason.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                    Limitation of Liability
                </h2>
                <p className="mb-2">
                    To the maximum extent permitted by law, Housing Support
                    Stack shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages, or any loss of
                    profits or revenues, whether incurred directly or
                    indirectly, or any loss of data, use, goodwill, or other
                    intangible losses, resulting from:
                </p>
                <ul className="list-disc ml-6 mb-2">
                    <li>(i) your use or inability to use our services;</li>
                    <li>
                        (ii) any unauthorized access to or use of our services;
                    </li>
                    <li>
                        (iii) any interruption or cessation of transmission to
                        or from our services;
                    </li>
                    <li>
                        (iv) any bugs, viruses, trojan horses, or the like that
                        may be transmitted to or through our services by any
                        third party;
                    </li>
                    <li>(v) any errors or omissions in any content;</li>
                    <li>
                        (vi) any defamatory, offensive, or illegal conduct of
                        any third party.
                    </li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Governing Law</h2>
                <p className="mb-2">
                    These Terms shall be governed and construed in accordance
                    with the laws of [your state/country], without regard to its
                    conflict of law provisions.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                    Changes to These Terms
                </h2>
                <p className="mb-2">
                    We reserve the right, at our sole discretion, to modify or
                    replace these Terms at any time. If a revision is material,
                    we will provide at least 30 days' notice prior to any new
                    terms taking effect. What constitutes a material change will
                    be determined at our sole discretion.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                <p className="mb-2">
                    If you have any questions about these Terms, please contact
                    us at{" "}
                    <a
                        href="mailto:ivcotad@gmail.com"
                        className="text-blue-500 underline"
                    >
                        ivcotad@gmail.com
                    </a>
                    .
                </p>
            </section>
        </div>
    );
};

export default TermsOfService;
