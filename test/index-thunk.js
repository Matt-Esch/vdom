var test = require("tape")
var VNode = require("vtree/vnode")
var diff = require("vtree/diff")

var createElement = require("../create-element")
var patch = require("../patch")


test("indexing over thunk boundaries", function (assert) {

    var leftThunk = {
        type: "Thunk",
        render: function () {
            return new VNode("div", {
                className:"test"
            }, "Left")
        }
    }

    var rightThunk = {
        type: "Thunk",
        render: function () {
            return new VNode("div", {
                className: "test"
            }, "Right")
        }
    }

    var root = createElement(leftThunk)
    var patches = diff(leftThunk, rightThunk)
    patch(root, patches)
    assert.equal(root.childNodes[0].data, "Right")
    assert.end()
})
