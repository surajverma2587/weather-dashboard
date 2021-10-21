// async is used on the function

// await is used where the asynchronous operation takes place

// task queue
// micro task queue

// declare an asynchronous function
const myFirstAsyncFn = async function (url) {
  // make a network call here
  const response = await fetch(url);

  console.log(response.status);

  if (response.status !== 200) {
    return { error: "Something went wrong" };
  } else {
    // use the .json() to extract the data from the response object
    const data = await response.json();

    return data;
  }
};

const init = async function () {
  const result = await myFirstAsyncFn(
    "https://api.openweathermap.org/data/2.5/weather?q=Leeds&appid=393609ac7b2e5f25ccdd00e626ee13ddx"
  );

  console.log(result);
};

init();
