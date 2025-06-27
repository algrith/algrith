'use client';

import { EyeOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import projects from '@/libs/projects.json';
import { ProjectsWrapper } from './styled';
import Link from '../shared/button/link';

const Projects = () => {
	return (
		<ProjectsWrapper id="projects">
			<div className="illustration projects">
				<Avatar src="./images/illustrations/testimonial.gif" alt="reviews_illustration" />
			</div>
			
			<h1 className="left">
				Recent Projects
			</h1>

			<div className="items">
				{projects.map((project) => (
          <figure key={project.name} data-aos="fade-up">
            <div className="top">
              <Avatar src={project.image} alt={`reviewer_${project.name}`} />
              <blockquote>{project.description}</blockquote>
            </div>

            <figcaption>
              <div>
                <div className="name">
                  {project.name}
                </div>
        
                <div className="company">
                  {project.company}
                </div>
              </div>

              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                <EyeOutlined />
              </Link>
            </figcaption>
          </figure>
				))}
			</div>
		</ProjectsWrapper>
	);
};

export default Projects;