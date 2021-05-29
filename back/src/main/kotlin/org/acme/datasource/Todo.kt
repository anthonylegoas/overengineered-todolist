package org.acme.datasource;

import org.neo4j.driver.types.Node;

class Todo {

    var id : Long = 0;
    var done : Boolean = false;
    var text : String = "";

    constructor() : super() {
        this.done = false;
    }

    constructor(id: Long, text: String) : super() {
        this.id = id;
        this.text = text;
    }

    companion object {
        fun from(node: Node) : Todo { 
            return Todo(node.id(), node.get("text").asString());
        }
    }
}