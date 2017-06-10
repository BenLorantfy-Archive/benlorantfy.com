package main

/** Dependencies **/
import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"os"

	"github.com/emicklei/go-restful"
	"github.com/mmcdole/gofeed"
)

/** Store API respones in memory to prevent excessive disk I/O **/
var awards string
var education string
var experience string
var projects string

/** Create the api **/
func CreateApi() *restful.WebService {
	var err error

	fmt.Println("===============================")
	fmt.Println("Starting benlorantfy.com GO API")
	fmt.Println("===============================")
	cwd, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	fmt.Println("cwd: " + cwd)
	fmt.Println("===============================")

	service := new(restful.WebService)
	service.
		Path("/api/go/v1").
		Consumes(restful.MIME_JSON).
		Produces(restful.MIME_JSON)

	/** Reads all the static json except articles which is dynamic **/
	projects = ReadJSON("../../../copy/projects.json")
	experience = ReadJSON("../../../copy/experience.json")
	awards = ReadJSON("../../../copy/awards.json")
	education = ReadJSON("../../../copy/education.json")

	service.Route(service.GET("/projects").To(GetProjects))
	service.Route(service.GET("/experience").To(GetExperience))
	service.Route(service.GET("/education").To(GetEducation))
	service.Route(service.GET("/awards").To(GetAwards))
	service.Route(service.GET("/articles").To(GetArticles))

	return service
}

func ReadJSON(path string) string {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		fmt.Print(err)
		return "failed"
	}

	return string(b)
}

func GetEducation(request *restful.Request, response *restful.Response) {
	response.AddHeader("Content-Type", "application/json")
	io.WriteString(response, education)
}

func GetAwards(request *restful.Request, response *restful.Response) {
	response.AddHeader("Content-Type", "application/json")
	io.WriteString(response, awards)
}

func GetProjects(request *restful.Request, response *restful.Response) {
	response.AddHeader("Content-Type", "application/json")
	io.WriteString(response, projects)
}

func GetExperience(request *restful.Request, response *restful.Response) {
	response.AddHeader("Content-Type", "application/json")
	io.WriteString(response, experience)
}

func GetArticles(request *restful.Request, response *restful.Response) {
	response.AddHeader("Content-Type", "application/json")
	fp := gofeed.NewParser()
	feed, _ := fp.ParseURL("https://medium.com/feed/@benlorantfy/")
	// fmt.Println(feed)
	b, err := json.Marshal(feed)

	if err != nil {
		fmt.Println("error", err)
		io.WriteString(response, "failed")
	} else {
		str := string(b)
		// fmt.Println(feed.Title)
		// fmt.Println(feed.Items[0])
		io.WriteString(response, str)
	}
}
