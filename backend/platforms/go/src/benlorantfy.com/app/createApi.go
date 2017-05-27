package main

import (
    "github.com/emicklei/go-restful"
    //"log"
)

func CreateApi() *restful.WebService {
    service := new(restful.WebService)
    service.
        Path("/api/go/v1").
        Consumes(restful.MIME_JSON).
        Produces(restful.MIME_JSON)
        
    service.Route(service.GET("/education").To(GetEducation))
    // service.Route(service.POST("").To(UpdateUser))
    // service.Route(service.PUT("/{user-id}").To(CreateUser))
    // service.Route(service.DELETE("/{user-id}").To(RemoveUser))
        
    return service
}

func GetEducation(request *restful.Request, response *restful.Response) {
    response.WriteEntity("cheese")
}