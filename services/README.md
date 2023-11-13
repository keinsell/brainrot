# `services`

Services is monorepository root where we may contain 3rd-party services that are highly related to our `apps`. Example of service for e-commerce application could be saileor headless server.

Purpose of this directory is to decrease volume of code contained in deploy directories and mantain segregation of concerns between services, we would like to keep configuration of such service separated from our global one.