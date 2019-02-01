define({ "api": [
  {
    "type": "post",
    "url": "v1/vote/theme",
    "title": "Add new theme",
    "name": "ThemePost",
    "group": "Vote",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "themeName",
            "description": "<p>for body parameter.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Eror check passed succesfuly.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "themeId",
            "description": "<p>Theme`s ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"error\": null,\n\"themeId\": 10\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Internal",
            "description": "<p>server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\" : 'err'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api/v1/vote/vote.controller.js",
    "groupTitle": "Vote"
  },
  {
    "type": "get",
    "url": "v1/vote/theme",
    "title": "View all themes",
    "name": "ThemeView",
    "group": "Vote",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "themeId",
            "description": "<p>Id of theme.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "themeName",
            "description": "<p>Theme`s name.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"themeId\": 1,\n   \"themeName\": \"newName\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Internal",
            "description": "<p>server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"msg\": 'Internal Error'\n  \"error\" : 'err'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api/v1/vote/vote.controller.js",
    "groupTitle": "Vote"
  },
  {
    "type": "get",
    "url": "v1/theme/:themeId",
    "title": "View all votes for selected theme",
    "name": "ThemeViewSelected",
    "group": "Vote",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "themeName",
            "description": "<p>Theme`s name.</p>"
          },
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "vote",
            "description": "<p>Object with vote counters.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "yes",
            "description": "<p>Quantity of 'yes' votes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "no",
            "description": "<p>Quantity of 'no' votes.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"name\": \"newName\",\n    \"vote\": {\n        \"yes\": 8,\n        \"no\": 4\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Internal",
            "description": "<p>server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"msg\": 'Internal Error'\n  \"error\" : 'err'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api/v1/vote/vote.controller.js",
    "groupTitle": "Vote"
  },
  {
    "type": "post",
    "url": "v1/vote/theme/:themeId/no",
    "title": "Vote 'no' for theme",
    "name": "ThemeVoteNo",
    "group": "Vote",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "themeId",
            "description": "<p>from parameter</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Check if everything is fine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vote",
            "description": "<p>Check if User voted No</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "themeId",
            "description": "<p>Theme`s id User has voted for</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"response\": \"OK\",\n    \"vote\": \"No\",\n    \"themeId\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Internal",
            "description": "<p>server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\" : 'err'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api/v1/vote/vote.controller.js",
    "groupTitle": "Vote"
  },
  {
    "type": "post",
    "url": "v1/vote/theme/:themeId/yes",
    "title": "Vote 'yes' for theme",
    "name": "ThemeVoteYes",
    "group": "Vote",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Id",
            "optional": false,
            "field": "themeId",
            "description": "<p>from parameter</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Check if everything is fine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "vote",
            "description": "<p>Check if User voted Yes</p>"
          },
          {
            "group": "Success 200",
            "type": "Int",
            "optional": false,
            "field": "themeId",
            "description": "<p>Theme`s id User has voted for</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"response\": \"OK\",\n    \"vote\": \"yes\",\n    \"themeId\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Internal",
            "description": "<p>server error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\" : 'err'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api/v1/vote/vote.controller.js",
    "groupTitle": "Vote"
  }
] });
