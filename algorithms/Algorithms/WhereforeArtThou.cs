using System;
using System.Linq;
using System.Collections.Generic;
using System.Reflection;

namespace Algorithms
{
  public class WhereforeArtThou
  {
    /*
     * Make a function that looks through an array of 
     * objects (first argument) and returns an array 
     * of all objects that have matching property and 
     * value pairs (second argument). Each property 
     * and value pair of the source object has to be
     * present in the object from the collection if 
     * it is to be included in the returned array.
     *
     * For example, if the first argument is
     *  [{ first: "Romeo", last: "Montague" },
     *   { first: "Mercutio", last: null }, 
     *   { first: "Tybalt", last: "Capulet" }], 
     * and the second argument is { last: "Capulet" }, 
     * then you must return the third object from the 
     * array (the first argument), because it 
     * contains the property and its value, that
     * was passed on as the second argument.
     */
    public IEnumerable<dynamic> WhatIsInAName(object[] collection, object source)
    {
      var sourceProp = source.GetType().GetProperties().FirstOrDefault();
      if (sourceProp == null)
        throw new ArgumentException($"{nameof(source)} has no property defined.");
      return collection.Where(e => e.GetType().GetProperty(sourceProp.Name) != null);
    }
  }
}
