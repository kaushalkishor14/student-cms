import { Users2 } from "lucide-react";

export const generateLinks = (courses, active) => {
  return courses.map(course => ({
    title: course?.title,
    href: `/course/${course?._id}`,
    label: "",
    icon: Users2,
    variant: active === 'subject' ? "default" : "ghost",
    onClick: () => active('subject'),
    // subRoute: course?.batches?.map(batch => ({
    //   title: batch?.batchName,
    //   href: `/course/${course?.title}/batch/${batch._id}`,
    //   label: "",
    //   icon: Users2
    // })) || []
  }));
};
