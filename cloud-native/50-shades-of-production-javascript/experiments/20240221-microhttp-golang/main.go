// 🚀 Fiber is an Express inspired web framework written in Go with 💖
// 📌 API Documentation: https://docs.gofiber.io
// 📝 Github Repository: https://github.com/gofiber/fiber

package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"os"
)

func main() {
	// Print current process
	if fiber.IsChild() {
		fmt.Printf("[%d] Child\n", os.Getppid())
	} else {
		fmt.Printf("[%d] Master\n", os.Getppid())
	}

	// Fiber instance
	app := fiber.New(fiber.Config{
		Prefork: true,
	})

	// Routes
	app.Get("/", hello)

	// Start server
	log.Fatal(app.Listen(":1338"))

	// Run the following command to see all processes sharing port 3000:
	// sudo lsof -i -P -n | grep LISTEN
}

// Handler
func hello(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}
