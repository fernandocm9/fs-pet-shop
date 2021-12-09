routes = {
    '/': function(req, res, pets) {
          res.end('Try http://localhost:8000/pets');
    },

    '/pets': function(req, res, pets) {
    let jsonStr = JSON.stringify(pets)
      res.end(jsonStr);
    },
  
    '/pets/0': function(req, res, pets) {
        let jsonStr = JSON.stringify(pets[0])
      res.end(jsonStr);
    },

    '/pets/1': function(req, res, pets) {
        let jsonStr = JSON.stringify(pets[1])
        res.end(jsonStr);
      }
    
  }

module.exports = routes