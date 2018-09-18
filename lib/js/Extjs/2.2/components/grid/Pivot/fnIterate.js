  function isIterable(v) {
      //check for array or arguments
      if(Ext.isArray(v) || v.callee) {
          return true;
      }
      //check for node list type
      if(/NodeList|HTMLCollection/.test(toString.call(v))) {
          return true;
      }
      //NodeList has an item and length property
      //IXMLDOMNodeList has nextNode method, needs to be checked first.
      return ((typeof v.nextNode != 'undefined' || v.item) && Ext.isNumber(v.length));
  }
  /**
   * Iterates either the elements in an array, or each of the properties in an object.
   * <strong>Note</strong>: If you are only iterating arrays, it is better to call Ext.each.
   * @param {Object/Array} object The object or array to be iterated
   * @param {Function} fn The function to be called for each iteration.
   * The iteration will stop if the supplied function returns false, or
   * all array elements / object properties have been covered. The signature
   * varies depending on the type of object being interated:
   * <div class="mdetail-params"><ul>
   * <li>Arrays : <tt>(Object item, Number index, Array allItems)</tt>
   * <div class="sub-desc">
   * When iterating an array, the supplied function is called with each item.</div></li>
   * <li>Objects : <tt>(String key, Object value, Object)</tt>
   * <div class="sub-desc">
   * When iterating an object, the supplied function is called with each key-value pair in
   * the object, and the iterated object</div></li>
   * </ul></div>
   * @param {Object} scope The scope (<code>this</code> reference) in which the specified function is executed. Defaults to
   * the <code>object</code> being iterated.
   */
  function iterate(obj, fn, scope) {
      if(Ext.isEmpty(obj)) {
          return;
      }
      if(isIterable(obj)) {
          Ext.each(obj, fn, scope);
          return;
      } else if(typeof obj == 'object') {
          for(var prop in obj) {
              if(obj.hasOwnProperty(prop)) {
                  if(fn.call(scope || obj, prop, obj[prop], obj) === false) {
                      return;
                  }
              }
          }
      }
  }


