function andCall(promise, callback)
{
      if(callback)
      {
            ///console.log(promise);
            promise.then(
                  (value) => callback(null, value), /// success
                  (err) => callback(err, null)  /// fail
            );
      }
      return promise;
}
exports.andCall = andCall;