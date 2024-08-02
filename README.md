# learn-nestjs

nest flow:
request                                         response
    ⬇️                                           ⬆️                                           
middleware (configure method in AppModule)      exception filter  
    ⬇️                                           ⬆️
   guard                                         ⬆️
    ⬇️                                           ⬆️
     ====================interceptor===============
    ⬇️                                           ⬆️
   pipe                                          ⬆️
        ↘️                                    ↗️
                constroller route logic

based on a udemy [course](https://www.udemy.com/share/104SA4/): 


