package org.acme.datasource

import java.net.URI;
import java.util.concurrent.CompletionException;
import java.util.concurrent.CompletionStage;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Values;
import org.neo4j.driver.async.AsyncSession;
import org.neo4j.driver.exceptions.NoSuchRecordException;

@Path("todos")
class TodoResource {

    @Inject
    lateinit var driver : Driver;

    @GET
    fun get() : CompletionStage<Response> {
        // open a new async session with Neo4j
        var session : AsyncSession = driver.asyncSession();
        return session
                // execute the query
                .runAsync("MATCH (f:Todo) RETURN f ORDER BY f.text")
                // retrieve a cursor, list the result and create Todos
                .thenCompose{cursor -> cursor.listAsync{record -> Todo.from(record.get("f").asNode())}}
                // close the session after processing
                .thenCompose{todos -> session.closeAsync().thenApply{signal -> todos}}
                // create a JAX-RS response
                .thenApply(Response::ok)
                .thenApply(ResponseBuilder::build);
    }
}