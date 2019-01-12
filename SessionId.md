The following console.log's are commented out to make the terminal easier to track: 

#req.session.id
    /server/index.js

  //logging middleware, for development.  Can get rid of when we are done.
  app.use((req, res, next) => {
    console.log('>>>>>>>>>>>>>>>req.session.id: ', req.session.id)
    next()
  })


#req.session
    /server/index.js

  app.use((req, res, next) => {
    req.session.guest = true
    console.log('SESSION: ', req.session)
    next()
  })

