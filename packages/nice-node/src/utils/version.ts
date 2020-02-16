console.log(`
user-agent: 
 - ${process.env.npm_config_user_agent}
nice-node:
 - ${process.env.npm_package_dependencies_nice_node}
package-version:
 - ${process.env.npm_package_version}
`);
