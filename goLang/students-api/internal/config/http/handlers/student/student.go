package student

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"

	"github.com/devyanshuNegi/go-students-api/internal/storage"
	"github.com/devyanshuNegi/go-students-api/internal/types"
	"github.com/devyanshuNegi/go-students-api/internal/utils/response"
	"github.com/go-playground/validator/v10"
)


func New() http.HandlerFunc {
	 return func(w http.ResponseWriter, r *http.Request) {
		slog.Info("creating a student")


		var student types.Student

		err := json.NewDecoder(r.Body).Decode(&student)
		if errors.Is(err, io.EOF) {
			response.WriteJson(w, http.StatusBadRequest, response.GeneralError(fmt.Errorf("empty body")))
			return 
		}


		if err != nil {
			response.WriteJson(w, http.StatusBadRequest, response.GeneralError(err))
			return 
		}

		// validate the request
		// follow zero trust policy

		if err:= validator.New().Struct(student); err!=nil {

			validateErrs := err.(validator.ValidationErrors)
			response.WriteJson(w, http.StatusBadRequest, response.ValidationError(validateErrs))
			return
		}


		lastId, err := storage.CreateStudent(
			storage.Storage,
			student.Name,
			student.Email,
			student.Age,
		)

		if err!=nil {
			// TODO Learn what this syntax mean written below
			response.WriteJson(w, http.StatusCreated, map[string]int64{"id": lastId})
		}


		response.WriteJson(w, http.StatusCreated, map[string] string{"success": "OK"})
	}
}

