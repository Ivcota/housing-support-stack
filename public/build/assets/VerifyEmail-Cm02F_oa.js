import{W as n,j as e,Y as a,a as d}from"./app-DqNi87K9.js";import{G as m}from"./GuestLayout-47_R5s8H.js";import{P as l}from"./PrimaryButton-BBdTFxBR.js";import"./ApplicationLogo-C5nGa531.js";import"./button-OrZBroKR.js";import"./utils-C-5SdYIA.js";function y({status:t}){const{post:i,processing:s}=n({}),o=r=>{r.preventDefault(),i(route("verification.send"))};return e.jsxs(m,{children:[e.jsx(a,{title:"Email Verification"}),e.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."}),t==="verification-link-sent"&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:"A new verification link has been sent to the email address you provided during registration."}),e.jsx("form",{onSubmit:o,children:e.jsxs("div",{className:"mt-4 flex items-center justify-between",children:[e.jsx(l,{disabled:s,children:"Resend Verification Email"}),e.jsx(d,{href:route("logout"),method:"post",as:"button",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Log Out"})]})})]})}export{y as default};
