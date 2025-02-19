import { Prisma } from "@prisma/client";

export const faqSeed: Prisma.FaqCreateManyInput[] = [
    {
        question: "How do I purchase tickets for an event?",
        answer: "You can purchase tickets by browsing our event listings, selecting the event you want to attend, and following the checkout process.",
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept major credit cards (Visa, Mastercard, American Express), and online payment gateways like PayPal.",
    },
    {
        question: "Can I get a refund if I can't attend the event?",
        answer: "Refund policies vary depending on the event organizer. Please refer to the event's specific refund policy on the event page.",
    },
    {
        question: "How do I receive my tickets?",
        answer: "Tickets are typically delivered electronically via email. You can also access them through your account on our website.",
    },
    {
        question: "What should I do if I haven't received my tickets?",
        answer: "Please check your spam or junk folder. If you still haven't received your tickets, contact our customer support team for assistance.",
    },
];