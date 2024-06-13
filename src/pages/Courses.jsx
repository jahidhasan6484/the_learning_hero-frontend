import CourseCard from "../components/CourseCard";

const Courses = () => {
  const coursesData = [
    {
      _id: "aa",
      title: "Introduction to JavaScript",
      description:
        "Learn the basics of JavaScript, the most popular programming language for web development.",
      instructor: "Juliana Silva",
      bannerURL: "./course1.png",
      fee: "$49.99",
    },
    {
      _id: "asaa",
      title: "Advanced CSS Techniques",
      description:
        "Take your CSS skills to the next level by learning advanced layout and design techniques.",
      instructor: "Mark Johnson",
      bannerURL: "./course2.png",
      fee: "$59.99",
    },
    {
      _id: "aaaa",
      title: "Data Science with Python",
      description:
        "Master data science concepts and techniques using the powerful Python programming language.",
      instructor: "Susan Lee",
      bannerURL: "./course3.png",
      fee: "$79.99",
    },
    {
      _id: "aad",
      title: "Digital Marketing Fundamentals",
      description:
        "Explore the essentials of digital marketing, including SEO, social media, and content strategy.",
      instructor: "Michael Brown",
      bannerURL: "./course4.png",
      fee: "$69.99",
    },
    {
      _id: "aae",
      title: "Essential Life Hacks",
      description:
        "Discover practical tips and tricks to make everyday tasks easier and more efficient.",
      instructor: "Jessica Smith",
      bannerURL: "./course5.png",
      fee: "$39.99",
    },
  ];

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-center pb-6 text-2xl font-bold">Latest Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...coursesData].reverse().map((course, index) => {
          return <CourseCard key={index} course={course} index={index} />;
        })}
      </div>
    </div>
  );
};

export default Courses;
