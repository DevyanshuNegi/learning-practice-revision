package main

import (
	// "fmt"
	"context"
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/devyanshuNegi/go-students-api/internal/config"
	"github.com/devyanshuNegi/go-students-api/internal/config/http/handlers/student"
	"github.com/devyanshuNegi/go-students-api/internal/storage/sqlite"
)

func main() {
	// load config
	// database setup
	// setup router
	// setup server

	// load config
	cfg := config.MustLoad()

	storage, err := sqlite.New(cfg)
	if err!=nil {
		log.Fatal(err)
	}

	slog.Info("storage initialized", slog.String("env", cfg.Env), slog.String("version", "1.0.0"))


	router := http.NewServeMux()
	router.HandleFunc("POST /api/students", student.New(storage))

	// setup server
	server := http.Server{
		Addr:    cfg.Addr,
		Handler: router,
	}

	fmt.Println("server startyed", cfg.Addr)

	done := make(chan os.Signal, 1)


	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM )

	go func() {
		err := server.ListenAndServe()
		if err != nil {
			log.Fatal("failed to start server ")
		}
	}()

	<- done

	slog.Info("shutting down the server")

	// TODO: learn more about context
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second	)
		defer cancel()
	
	err = server.Shutdown(ctx)
	if err!=nil {
		slog.Error("failed to shutdown server ", slog.String("error", err.Error()))

	}

	slog.Info("server shutdown successfully")
	// fmt.Println("Server started")

}
