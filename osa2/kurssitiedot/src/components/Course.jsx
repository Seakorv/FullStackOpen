const Header = (props) => {
  console.log(props);
  return <h2>{props.course}</h2>;
};

const Content = (props) => {
  return (
    <div>
        {props.parts.map(part =>
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )}
    </div>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0) //reduce videosta napattu

  return (
    <div>
      <b>
        total of {totalExercises} exercises
      </b>
    </div>
  );
};

const Course = ({ course }) =>
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>

export default Course
