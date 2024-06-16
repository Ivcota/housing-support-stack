const Ziggy = {"url":"http:\/\/housing-support-stack.test","port":null,"defaults":{},"routes":{"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"auth.google":{"uri":"auth\/callback","methods":["GET","HEAD"]},"dashboard":{"uri":"dashboard","methods":["GET","HEAD"]},"comment.store":{"uri":"comment","methods":["POST"]},"survey.show":{"uri":"survey\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"survey.delete":{"uri":"survey\/{id}","methods":["DELETE"],"parameters":["id"]},"survey.upload":{"uri":"upload-survey","methods":["GET","HEAD"]},"survey.upload.survey":{"uri":"upload-survey","methods":["POST"]},"survey.download":{"uri":"survey-download\/{fileName}","methods":["GET","HEAD"],"parameters":["fileName"]},"profile.edit":{"uri":"profile","methods":["GET","HEAD"]},"profile.update":{"uri":"profile","methods":["PATCH"]},"profile.destroy":{"uri":"profile","methods":["DELETE"]},"admin.dashboard":{"uri":"admin\/dashboard","methods":["GET","HEAD"]},"admin.lhc.show":{"uri":"admin\/lhc\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"register":{"uri":"register","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"password.request":{"uri":"forgot-password","methods":["GET","HEAD"]},"password.email":{"uri":"forgot-password","methods":["POST"]},"password.reset":{"uri":"reset-password\/{token}","methods":["GET","HEAD"],"parameters":["token"]},"password.store":{"uri":"reset-password","methods":["POST"]},"verification.notice":{"uri":"verify-email","methods":["GET","HEAD"]},"verification.verify":{"uri":"verify-email\/{id}\/{hash}","methods":["GET","HEAD"],"parameters":["id","hash"]},"verification.send":{"uri":"email\/verification-notification","methods":["POST"]},"password.confirm":{"uri":"confirm-password","methods":["GET","HEAD"]},"password.update":{"uri":"password","methods":["PUT"]},"logout":{"uri":"logout","methods":["POST"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };